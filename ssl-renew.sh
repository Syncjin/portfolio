#!/bin/bash

# SSL 인증서 갱신 스크립트

echo "SSL 인증서 갱신을 시작합니다..."

# 기존 컨테이너 중지
docker-compose -f docker-compose.ssl.yml down

# certbot으로 인증서 갱신
docker-compose -f docker-compose.ssl.yml run --rm certbot renew

# 컨테이너 재시작
docker-compose -f docker-compose.ssl.yml up -d

echo "SSL 인증서 갱신이 완료되었습니다." 