install:
	docker compose up -d
	docker compose exec -t node npm install

run:
	docker compose exec -t node npm run dev

shell:
	docker compose exec -it node sh