# python:3.8 官网基础镜像,基础镜像（已安装 Python 环境）  
#FROM python:3.8
FROM registry.cn-beijing.aliyuncs.com/wing_share_images/python:3.8-slim-bookworm


# 安装工具  
RUN apt-get update && apt-get install -y procps vim apache2-utils && rm -rf /var/lib/apt/lists/*  

# 工作目录  
WORKDIR /app  

# 复制依赖文件并安装  
COPY requirements.txt requirements.txt  
RUN pip3 install -r requirements.txt  

# 复制全部源码  
COPY . .  

# 启动命令（镜像运行时执行）  
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]  
