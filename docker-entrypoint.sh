#!/bin/sh

# 환경변수를 nginx.conf에 적용
envsubst '${DOMAIN_NAME}' < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf.tmp
mv /etc/nginx/nginx.conf.tmp /etc/nginx/nginx.conf

# Nginx 설정 테스트
nginx -t

# 전달받은 명령어 실행
exec "$@" 