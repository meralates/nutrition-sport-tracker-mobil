import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useAuth } from "../auth/AuthContext";
import { isValidEmail } from "@/utils/validation";

export function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setError(null);

    const e = email.trim();
    if (!isValidEmail(e)) return setError("Geçerli bir email gir.");
    if (password.length < 6) return setError("Şifre en az 6 karakter olmalı.");

    try {
      setLoading(true);
      await login(e, password);
    } catch (err: any) {
      // backend hata formatına göre burayı güzelleştiririz
      setError(err?.response?.data?.message ?? "Giriş başarısız.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 16, gap: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>Login</Text>

      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />

      <TextInput
        secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />

      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      <Button title={loading ? "Loading..." : "Login"} onPress={onSubmit} disabled={loading} />
    </View>
  );
}
