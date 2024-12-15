docker build -t tetherchand:latest -f Dockerfile .
docker save tetherchand:latest > tetherchand.tar
scp tetherchand.tar root@85.208.253.252:/root