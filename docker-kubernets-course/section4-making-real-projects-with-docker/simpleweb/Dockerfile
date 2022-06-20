# Specify a base image
FROM node:14-alpine

# Specify working directory
WORKDIR /usr/app

# Install some dependencies
COPY ./package.json ./
RUN npm install
# Idea behind seperating COPY steps in two stage is that if any change is done in a source of this project
# like some changes in index.js. Then any of the cached intermediate images of previous steps are not invalidated
# and will speed up the image build process. 
# So in this case only when package.json file is modified then on [RUN npm install] will be executed. 
# For any change in a source file e.g. index.js only [COPY ./ ./] step will be re executed and thus previous
# cached images will be reused
COPY ./ ./

# Default command
CMD ["npm", "start"]