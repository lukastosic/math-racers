rm -rf ./dist \
&& docker build -t math-race-builder . \
&& docker create --name math-race-container math-race-builder \
&& docker cp math-race-container:/app/dist ./dist \
&& docker rm math-race-container