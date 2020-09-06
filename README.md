# spreadsheet-api

## Business requirements 

1. Ability to import CSV files.
2. Ability to read previews (header and first five rows) of previously imported CSV files without reparsing.
3. Previews are being stored in PostgreSQL database.
4. Spreadsheet files are being stored in AWS S3 Service.
5. Parsing of the spreadsheet file is implemented within Node.js `child-process`.
6. Ability to extend functionality by parsing i.e: XLS files.

## Starting the application

In order to run the application, make sure you have `docker` and `docker-compose` installed on your machine.

To start the application run:
```shell
$ docker-compose up --build
```
The application should be accessible under `0.0.0.0:3000`.

---

If you face any issues, check if the containters are running:
```shell
$ docker-compose ps
```

or check logs:
```shell
$ docker-compose logs
```

**Enjoy!**
