package com.nlw.events.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class WebConfig {

      @Bean
      public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

            http.headers(headers -> headers.disable());
            http.cors(withDefaults()).csrf(csrf -> csrf.disable());
            http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
            http.authorizeHttpRequests((auth) -> auth.anyRequest().permitAll());

            return http.build();
      }

      @Value("${cors.origins}")
      private String corsOrigins;

      @Bean
      public WebMvcConfigurer corsConfigurer() {
            System.out.println(corsOrigins);

            return new WebMvcConfigurer() {
                  @Override
                  public void addCorsMappings(CorsRegistry registry) {
                        registry.addMapping("/**")
                                    .allowedMethods("*")
                                    .allowedOrigins(corsOrigins);
                        // .allowedHeaders("*")
                        // .exposedHeaders("*")
                        // .allowCredentials(false).maxAge(3600);
                  }
            };
      }

}
