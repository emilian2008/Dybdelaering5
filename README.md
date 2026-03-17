For the docker-compose.yaml to work, it needs some environment variables.

1) Create a .env file in the root folder. It should be set up like this:

    MYSQL_ROOT_PASSWORD=your_root_password_here
    MYSQL_DATABASE=your_database_name_here
    MYSQL_USER=your_username_here
    MYSQL_PASSWORD=your_password_here
    PORT_MYSQL=3306:3306
    PORT_FRONTEND=3000:3000
    PORT_BACKEND=5678:5678
    TIMEZONE=Europe/Oslo
    RESTART=always

    - The example values for the ports are default for the services, and might already be occupied. Change these if necessary.
    - If you want, you can change the RESTART condition to any of the following to your preference:
        - no
        - always
        - on-failure
        - unless-stopped


2) Run "docker compose up --build" in the root folder.