#!/bin/sh
docker run -d -p 80:80 \
--name wishr-web \
--network wishr-net \
00duck/wishr-web:1.0.0