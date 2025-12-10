import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { apiService } from '@/services/api';

interface AdminLoginProps {
  onLogin: (token: string, admin: any) => void;
}

interface AdminLoginData {
  username: string;
  password: string;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [formData, setFormData] = useState<AdminLoginData>({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [mfaRequired, setMfaRequired] = useState(false);
  const [challengeId, setChallengeId] = useState<string>('');
  const [otpCode, setOtpCode] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiService.login(formData.username.trim(), formData.password);
      if (response.mfa_required) {
        setMfaRequired(true);
        setChallengeId(response.challenge_id);
      } else if (response.access_token) {
        localStorage.setItem('adminToken', response.access_token);
        localStorage.setItem('adminData', JSON.stringify(response.user));
        onLogin(response.access_token, response.user);
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await apiService.verifyMfa(challengeId, otpCode.trim());
      if (response.access_token) {
        localStorage.setItem('adminToken', response.access_token);
        localStorage.setItem('adminData', JSON.stringify(response.user));
        onLogin(response.access_token, response.user);
      }
    } catch (err: any) {
      setError(err.message || 'Código 2FA inválido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Ingresa tus credenciales para acceder al panel administrativo
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!mfaRequired ? (
            <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulario de acceso">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Ingresa tu usuario"
                aria-required="true"
                minLength={3}
                maxLength={64}
              />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu contraseña"
                  aria-required="true"
                  minLength={8}
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleMfaSubmit} className="space-y-4" aria-label="Verificación 2FA">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="otp">Código de verificación</Label>
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Ingresa el código de tu app de autenticación"
                  aria-required="true"
                  maxLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Verificando...' : 'Verificar Código'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
