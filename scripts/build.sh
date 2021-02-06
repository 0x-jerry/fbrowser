rm -rf client/dist
rm -rf server/dist
rm -rf server/public

cd server && yarn build &
cd client && yarn build 

cd ..

cp -r client/dist server/public