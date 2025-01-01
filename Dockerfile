# Use official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the Next.js project
RUN yarn build

# Expose the port (default Next.js port is 3000)
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "start"]
