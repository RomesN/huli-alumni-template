package com.huli.todoapp.config;

import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeysConfig {
  @Value("${rsa.public-key}")
  private String publicKey;
  @Value("${rsa.private-key}")
  private String privateKey;

  @Bean
  public RSAPublicKey getPublicKey()
      throws NoSuchAlgorithmException, InvalidKeySpecException {
    String publicKeyContent = publicKey.replace("-----BEGIN PUBLIC KEY-----", "")
        .replace("-----END PUBLIC KEY-----", "");
    KeyFactory keyFactory = KeyFactory.getInstance("RSA");
    X509EncodedKeySpec keySpecPKCS8 =
        new X509EncodedKeySpec(Base64.getDecoder().decode(publicKeyContent));
    return (RSAPublicKey) keyFactory.generatePublic(keySpecPKCS8);
  }

  @Bean
  public RSAPrivateKey getPrivateKey()
      throws NoSuchAlgorithmException, InvalidKeySpecException {
    String privateKeyContent = privateKey.replace("-----BEGIN PRIVATE KEY-----", "")
        .replace("-----END PRIVATE KEY-----", "");
    KeyFactory keyFactory = KeyFactory.getInstance("RSA");
    PKCS8EncodedKeySpec keySpecPKCS8 =
        new PKCS8EncodedKeySpec(Base64.getDecoder().decode(privateKeyContent));
    return (RSAPrivateKey) keyFactory.generatePrivate(keySpecPKCS8);
  }
}
