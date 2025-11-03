rm -rf ./dist \
&& docker build -t math-race-builder . \
&& docker create --name math-race-container math-race-builder \
&& docker cp math-race-container:/app/dist ./dist \
&& docker rm math-race-container \
&& cd dist \
&& git checkout -b gh-pages \
&& git add . \
&& git commit -m "Deploy to GitHub Pages" \
&& git push -f origin gh-pages \
&& cd .. \
&& echo "Deployment to GitHub Pages completed successfully." \
&& echo "Switching back to master branch." \
&& git checkout master

