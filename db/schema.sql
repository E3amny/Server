USE sql11442892 ;

CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    age INT(3),   is now varchar 255
    img BLOB(5120),
    email VARCHAR(255) UNIQUE NOT NULL,
    country VARCHAR(255),
    passwordd VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT NOT NULL,
    namee VARCHAR(255) NOT NULL,
    Primary key (id)
);


CREATE TABLE IF NOT EXISTS campaigns (
    id INT AUTO_INCREMENT NOT NULL,
    userId INT,
    country VARCHAR(255) NOT NULL,
    typee INT NOT NULL,
    targett INT NOT NULL,
    current_target INT DEFAULT 0,
    img BLOB(5120) NOT NULL,
    title VARCHAR(255) NOT NULL,
    descriptionn VARCHAR(255) NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    created_at DATE,
    FOREIGN KEY (typee) REFERENCES categories(id),
    FOREIGN KEY (userId) REFERENCES users(id),
    Primary key (id)
);


CREATE TABLE IF NOT EXISTS contributions(
    id INT AUTO_INCREMENT NOT NULL,
    userId INT,
    campaign_id INT,
    category_id INT,
    created_at DATE ,
    amount INT,
    FOREIGN KEY (campaign_id ) REFERENCES campaigns(id),
    FOREIGN KEY (userId ) REFERENCES users(id),
    FOREIGN KEY (category_id ) REFERENCES categories(id),
    Primary key (id)
);



CREATE TABLE IF NOT EXISTS bloodpost(
    id INT AUTO_INCREMENT NOT NULL,
    userId INT,
    title VARCHAR(255) NOT NULL,
    descriptionn VARCHAR(255) NOT NULL,
    created_at DATE,
    FOREIGN KEY (userId ) REFERENCES users(id),
    PRIMARY KEY (id)
);


 
CREATE TABLE IF NOT EXISTS HospitalTable(
    id INT AUTO_INCREMENT NOT NULL,
    namee VARCHAR(255) NOT NULL,  
    userId INT,
    Amount INT NOT NULL,
    BankAccount VARCHAR(255) NOT NULL,
    FOREIGN KEY (userId ) REFERENCES users(id),
    PRIMARY KEY (id)
);
