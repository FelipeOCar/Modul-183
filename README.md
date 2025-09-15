Overview

This repository focuses on the practical aspects of Module 183, highlighting the use of containerization technologies in application development. It includes:

C#: For backend development.

HTML/CSS/JavaScript: For frontend development.

Docker: To containerize the application.

Kubernetes: For managing and scaling the application.

Features

Full-Stack Development: Combines frontend and backend technologies.

Dockerized Application: Ensures consistency across different environments.

Kubernetes Deployment: Provides scalability and management of the application.

Getting Started

Clone the repository:

git clone https://github.com/FelipeOCar/Modul-183.git


Navigate into the project directory:

cd Modul-183


Build the Docker image:

docker build -t modul-183 .


Run the application:

docker run -p 8080:80 modul-183
