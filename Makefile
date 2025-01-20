install:
	docker compose up -d
	docker compose exec -t node npm install

run:
	docker-compose up -d

shell:
	docker compose exec -it node sh