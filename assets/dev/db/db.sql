-- MySQL Dump with Foreign Key Relations

CREATE TABLE locale (
    `name` VARCHAR(10) PRIMARY KEY NOT NULL
);

CREATE TABLE `text-i18n` (
    text_key VARCHAR(255)NOT NULL PRIMARY KEY,
    `value` TEXT NOT NULL,
    locale VARCHAR(10) NOT NULL,
    FOREIGN KEY (locale) REFERENCES locale(`name`) ON DELETE CASCADE
);

CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hint VARCHAR(255) NOT NULL,
    photo TEXT
);

CREATE TABLE `category-text-i18n` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_key VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    INDEX (category_id),
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE RESTRICT,
    FOREIGN KEY (name_key) REFERENCES `text-i18n`(text_key) ON DELETE CASCADE
);

CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(10,2) NOT NULL,
    planting_start DATE,
    planting_end DATE,
    season VARCHAR(50),
    category_id INT NOT NULL,
    hint VARCHAR(255) NOT NULL,
    INDEX (category_id),
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE RESTRICT
);

CREATE TABLE `product-title` (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    product_id INT NOT NULL ,
    name_key VARCHAR(255) NOT NULL,
    INDEX (product_id),
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE RESTRICT,
    FOREIGN KEY (name_key) REFERENCES `text-i18n`(text_key) ON DELETE CASCADE
);

CREATE TABLE `product-description` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    name_key VARCHAR(255) NOT NULL,
    INDEX (product_id),
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE RESTRICT,
    FOREIGN KEY (name_key) REFERENCES `text-i18n`(text_key) ON DELETE CASCADE
);

CREATE TABLE `product-comment` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    comment TEXT NOT NULL,
    username VARCHAR(100) NOT NULL,
    INDEX (product_id),
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE RESTRICT
);

CREATE TABLE article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hint VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `article-titles` (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    article_id INT NOT NULL,
    name_key VARCHAR(255) NOT NULL,
    INDEX (article_id),
    FOREIGN KEY (article_id) REFERENCES article(id) ON DELETE RESTRICT,
    FOREIGN KEY (name_key) REFERENCES `text-i18n`(text_key) ON DELETE CASCADE
);

CREATE TABLE `article-description` (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    article_id INT NOT NULL,
    name_key VARCHAR(255) NOT NULL,
    INDEX (article_id),
    FOREIGN KEY (article_id) REFERENCES article(id) ON DELETE CASCADE,
    FOREIGN KEY (name_Key) REFERENCES `text-i18n`(text_key) ON DELETE CASCADE
);

CREATE TABLE `article-image` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    article_id INT NOT NULL,
    image_url TEXT NOT NULL,
    INDEX (article_id),
    FOREIGN KEY (article_id) REFERENCES article(id) ON DELETE CASCADE
);

CREATE TABLE `visiting-stats` (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `visitors-cout` INT NOT NULL,
    `date` DATE
);

-- Seed Localization Data
INSERT INTO localization (lang_code) VALUES ('ua'), ('en');
