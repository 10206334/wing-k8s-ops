FROM registry.cn-beijing.aliyuncs.com/wing_share_images/node:16-alpine

WORKDIR /frontend

COPY . .

RUN yarn install
 
CMD ["yarn", "start"]
