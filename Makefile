.PHONY: rebuild-and-logs build dev clean

# Default target
all: rebuild-and-logs

# Rebuild and restart with logs
rebuild-and-logs:
	@echo "🔄 Stopping containers..."
	docker-compose down
	@echo "📦 Building npm packages..."
	npm run build
	@echo "🚀 Starting containers..."
	docker-compose up -d
	@echo "📋 Following n8n logs..."
	docker-compose logs -f n8n

# Just build without restarting
build:
	@echo "📦 Building npm packages..."
	npm run build

# Development mode
dev:
	@echo "🔄 Stopping containers..."
	docker-compose down
	@echo "📦 Building npm packages..."
	npm run build
	@echo "🚀 Starting containers in development mode..."
	docker-compose up

# Clean up
clean:
	@echo "🧹 Cleaning up..."
	docker-compose down -v
	docker system prune -f
	rm -rf node_modules
	rm -rf dist 