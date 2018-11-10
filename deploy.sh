docker build -t vinay0079/multi-client:latest -t vinay0079/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t vinay0079/multi-server:latest vinay0079/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t vinay0079/multi-worker:latest vinay0079/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push vinay0079/multi-client:latest
docker push vinay0079/multi-server:latest
docker push vinay0079/multi-worker:latest

docker push vinay0079/multi-client:$SHA
docker push vinay0079/multi-server:$SHA
docker push vinay0079/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=vinay0079/multi-server:$SHA
kubectl set image deployments/client-deployment client=vinay0079/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=vinay0079/multi-worker:$SHA



