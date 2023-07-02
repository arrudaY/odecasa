FROM tomcat:jdk17
      COPY ./target/airBNB-2.0.jar /usr/local/tomcat/webapps/airBNB-2.0.jar
      CMD ["catalina.sh", "run"]
