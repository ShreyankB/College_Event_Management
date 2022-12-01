const request = require('supertest');
const app = require("./app.js");



describe("EventManager dashboard related APIs test", () => {
  describe("request to organize event api test", () => {
    test("Event request raised by invalid email ID should be rejected", async () => {
      const res = await request(app).post("/api/requestEvent").set("Accept", "application/json").send({
        "name": "Test EVent22",
        "eventType": "other",
        "maxParticipation": 1000,
        "allowedUserGroups": "all",
        "datetime": "010101",
        "venue":"aa",
        "otherinfo":"aa",
        "addedby": "event.aa@gmail.com"
      });

      expect(res.statusCode).toBe(400);
    })

    test("Event request raised with incomplete details must be rejected", async () => {
      const res = await request(app).post("/api/requestEvent").set("Accept", "application/json").send({
        "name": "Test EVent22",
        "eventType": "other",
        "allowedUserGroups": "all",
        "datetime": "010101",
        "venue":"aa",
        "otherinfo":"aa",
        "addedby": "event.aa@gmail.com"
      });
      expect(res.statusCode).toBe(400);
    })

    test("Event request raised with all the necessary details needed must be accepted", async () => {
      const res = await request(app).post("/api/requestEvent").set("Accept", "application/json").send({
        "name": "Test EVent242",
        "eventType": "other",
        "maxParticipation": 1000,
        "allowedUserGroups": "all",
        "datetime": "010101",
        "venue":"aa",
        "otherinfo":"aa",
        "addedby": "event.aa@gmail.com"
      });
      expect(res.statusCode).toBe(200);
    })
  })

  describe("Show unapproved events for event manager api test", () => {
    test("Request with invalid email id must be rejected", async () => {
      const res = await request(app).get("/api/showPendingEvents/random.test@gmail.com");
      expect(res.statusCode).toBe(400);
    })

    test("Request with valid email id must be accepted", async () => {
      const res = await request(app).get("/api/showPendingEvents/em.test@gmail.com");
      expect(res.statusCode).toBe(200);
    })

    test("Response type must be json", async () => {
      const res = await request(app).get("/api/showPendingEvents/em.test@gmail.com");
      expect(typeof res.body).toBe('object');
    })
  })

  describe("Show approved events for Event Manager api test", () => {
    test("Request with invalid email id must be rejected", async () => {
      const res = await request(app).get("/api/showAllEMEvents/random.test@gmail.com");
      expect(res.statusCode).toBe(400);
    })

    test("Request with valid email id must be accepted", async () => {
      const res = await request(app).get("/api/showAllEMEvents/em.test@gmail.com");
      expect(res.statusCode).toBe(200);
    })

    test("Response type must be json", async () => {
      const res = await request(app).get("/api/showAllEMEvents/em.test@gmail.com");
      expect(typeof res.body).toBe('object');
    })  })
})

describe("Admin dashboard test", () => {
  describe("approve an event", () => {
    test('request with invalid event id must be rejected', async () => {
      const res = await request(app).get("/api/approveEvent/12307");
      expect(res.statusCode).toBe(400);
    })

    test('request with an valid event id must be processed', async () => {
      const res = await request(app).get("/api/approveEvent/63824ae64231e57c0b537a76");
      expect(res.statusCode).toBe(200);
    })
  })

  describe("reject an event", () => {
    test('request with invalid event id must be rejected', async () => {
      const res = await request(app).get("/api/rejectEvent/12307");
      expect(res.statusCode).toBe(400);
    })

    test('request with an valid event id must be proccessed', async () => {
      const res = await request(app).get("/api/rejectEvent/63824ae64231e57c0b537a76");
      expect(res.statusCode).toBe(200);
    })
  })

  describe("Show events pending for approval", () => {
    test("Request with invalid email id must be rejected", async () => {
      const res = await request(app).get("/api/showAllPendingEvents/random.admin@gmail.com");
      expect(res.statusCode).toBe(400);
    })

    test("Request with valid email id must be accepted", async () => {
      const res = await request(app).get("/api/showPendingEvents/admin@gmail.com");
      expect(res.statusCode).toBe(200);
    })

    test("Response type must be json", async () => {
      const res = await request(app).get("/api/showPendingEvents/admin@gmail.com");
      expect(typeof res.body).toBe('object');
    })
  })

  describe("Show list of approved events", () => {
    test("Request with invalid email id must be rejected", async () => {
      const res = await request(app).get("/api/allEvents/random.admin@gmail.com");
      expect(res.statusCode).toBe(400);
    })

    test("Request with valid email id must be accepted", async () => {
      const res = await request(app).get("/api/allEvents/admin@gmail.com");
      expect(res.statusCode).toBe(200);
    })

    test("Response type must be json", async () => {
      const res = await request(app).get("/api/allEvents/admin@gmail.com");
      expect(typeof res.body).toBe('object');
    })
  })

  describe("Show list of registered users", () => {
    test("Request with invalid email id must be rejected", async () => {
      const res = await request(app).get("/api/allUserList/random.admin@gmail.com");
      expect(res.statusCode).toBe(400);
    })

    test("Request with valid email id must be accepted", async () => {
      const res = await request(app).get("/api/allUserList/admin@gmail.com");
      expect(res.statusCode).toBe(200);
    })

    test("Response type must be json", async () => {
      const res = await request(app).get("/api/allUserList/admin@gmail.com");
      expect(typeof res.body).toBe('object');
    })
  })
})

describe("Student dashboard related APIs test", () => {
  describe("Show Events that student can participate", () => {
    test("If Invalid email ID passed it should return status code 400", async () => {
      const res = await request(app).get("/api/showStudentsEvents/sb99@gmail.com");
      expect(res.statusCode).toBe(400);
    })

    test("If Valid email ID passed it should return status code 200", async () => {
      const res = await request(app).get("/api/showStudentsEvents/student.test@gmail.com");
      expect(res.statusCode).toBe(200);
    })

    test("Response body should be an json object", async () => {
      const res = await request(app).get("/api/showStudentsEvents/student.test@gmail.com");
      expect(typeof res.body).toBe('object');
    }) 
  })

  describe("API to Show Events that student has participated", () => {
    test("If Invalid email ID passed it should return status code 400", async () => {
      const res = await request(app).get("/api/showStudentParticipatedEvents/sb99@gmail.com");
      expect(res.statusCode).toBe(400);
    })

    test("If Valid email ID passed it should return status code 200", async () => {
      const res = await request(app).get("/api/showStudentParticipatedEvents/student.test@gmail.com");
      expect(res.statusCode).toBe(200);
    })

    test("Response body should be an json object", async () => {
      const res = await request(app).get("/api/showStudentParticipatedEvents/student.test@gmail.com");
      expect(typeof res.body).toBe('object');
    }) 
  })
})