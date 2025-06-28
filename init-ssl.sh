#!/bin/bash

# SSL 인증서 초기화 스크립트

echo "SSL 인증서 디렉토리를 생성합니다..."

# certbot 디렉토리 생성
mkdir -p certbot/conf
mkdir -p certbot/www

# 권한 설정
chmod 755 certbot
chmod 755 certbot/conf
chmod 755 certbot/www

echo "SSL 인증서 디렉토리 생성 완료!"
echo "이제 다음 명령어로 SSL 모드로 실행할 수 있습니다:"
echo "docker compose -f docker-compose.ssl.yml up -d --build" 