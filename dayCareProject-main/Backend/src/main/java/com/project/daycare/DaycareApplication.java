package com.project.daycare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.project.daycare.repository")
@SpringBootApplication
public class DaycareApplication {

    public static void main(String[] args) {
        SpringApplication.run(DaycareApplication.class, args);
    }

}
