FROM node:18

WORKDIR /opt/app

RUN mkdir -p /opt/app &&\
    addgroup app &&\
    adduser app --ingroup app --disabled-password -q &&\
    chown -R app /opt/app

ADD ./ /opt/app
USER app
EXPOSE 80
EXPOSE 443
CMD [ "npm", "start" ]
