import getDateDistance from "./getDateDistance";

describe("getDateDistance", () => {
  const date = new Date();

  it("works with no input", () => {
    const distance = getDateDistance();

    expect(distance).toBe("");
  });

  it("shows a moment ago for near distance", () => {
    const dateB = new Date(date.valueOf() - 1000);
    const distance = getDateDistance(date, dateB);

    expect(distance).toBe("A moment ago");
  });

  it("shows a moment ago for identical distance", () => {
    const distance = getDateDistance(date, date);

    expect(distance).toBe("A moment ago");
  });

  it("shows seconds for distance less than a minute", () => {
    const dateB = new Date(date.valueOf() - 59000);
    const distance = getDateDistance(date, dateB);

    expect(distance).toBe("59 seconds ago");
  });

  it("shows minutes for distance less than an hour", () => {
    const dateB = new Date(date.valueOf() - 1000 * 60 * 59);
    const distance = getDateDistance(date, dateB);

    expect(distance).toBe("59 minutes ago");
  });

  it("shows singular minute for distance of one minute", () => {
    const dateB = new Date(date.valueOf() - 1000 * 60 * 1);
    const distance = getDateDistance(date, dateB);

    expect(distance).toBe("1 minute ago");
  });

  it("shows hours for distance of less than a day", () => {
    const dateB = new Date(date.valueOf() - 1000 * 60 * 60 * 23);
    const distance = getDateDistance(date, dateB);

    expect(distance).toBe("23 hours ago");
  });

  it("shows singular hour for distance of one hour", () => {
    const dateB = new Date(date.valueOf() - 1000 * 60 * 60 * 1.9);
    const distance = getDateDistance(date, dateB);

    expect(distance).toBe("1 hour ago");
  });

  it("shows days for distance of less than a week", () => {
    const dateB = new Date(date.valueOf() - 1000 * 60 * 60 * 24 * 6.1);
    const distance = getDateDistance(date, dateB);

    expect(distance).toBe("6 days ago");
  });

  it("shows singular day for distance of one day", () => {
    const dateB = new Date(date.valueOf() - 1000 * 60 * 60 * 24 * 1.2);
    const distance = getDateDistance(date, dateB);

    expect(distance).toBe("1 day ago");
  });

  it("shows weeks for distance of less than a month", () => {
    const dateB = new Date(date.valueOf() - 1000 * 60 * 60 * 24 * 29);
    const distance = getDateDistance(date, dateB);

    expect(distance).toBe("4 weeks ago");
  });

  it("shows singular week for distance of one week", () => {
    const dateB = new Date(date.valueOf() - 1000 * 60 * 60 * 24 * 7);
    const distance = getDateDistance(date, dateB);

    expect(distance).toBe("It's been... one week");
  });

  it("shows months for distance of less than a year", () => {
    const dateB = new Date(date.valueOf() - 1000 * 60 * 60 * 24 * 364);
    const distance = getDateDistance(date, dateB);

    expect(distance).toBe("11 months ago");
  });

  it("shows singular month for distance of one month", () => {
    const dateB = new Date(date.valueOf() - 1000 * 60 * 60 * 24 * 31);
    const distance = getDateDistance(date, dateB);

    expect(distance).toBe("1 month ago");
  });

  it("shows years for distance", () => {
    const dateB = new Date(date.valueOf() - 1000 * 60 * 60 * 24 * 365 * 2);
    const distance = getDateDistance(date, dateB);

    expect(distance).toBe("2 years ago");
  });

  it("shows singular year for distance of one year", () => {
    const dateB = new Date(date.valueOf() - 1000 * 60 * 60 * 24 * 370);
    const distance = getDateDistance(date, dateB);

    expect(distance).toBe("1 year ago");
  });
});
