docker buildx build -t tetherchand-app .
docker save tetherchand-app > tether.tar
scp tether.tar root@85.208.253.252:/root