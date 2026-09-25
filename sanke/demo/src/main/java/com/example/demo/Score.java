package com.example.demo;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "scores")
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "timer", nullable = false)
    private String timer;

    // @Column 的作用就是：指定 Java 这个属性对应数据库里的哪一列。
    @Column(nullable = false)
    private Integer score;

    // 有当Java变量名和数据库列名不一样的时候，才需要：@Column(name = "xxx")
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public Score() {
    }

    public Score(String playerName, Integer score) {
        this.playerName = playerName;
        this.score = score;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getPlayerName() {
        return playerName;
    }

    public Integer getScore() {
        return score;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}