# Request 13 — Extract data to json add rescrape md fix leaptel savings

- **Date:** 2026-06-29
- **Sequence:** 13

## Verbatim request

Ok so new feature time, it seems for the leaptel pricing, and this could be for other offerings too, the discount/savings has not been scraped accurately, slight misunderstanding.

Can you extract all the isp data into its own data.json file which gets loaded and injected/used by the index.html file?

Then can you please add a AI_RESCRAPE.md file which outlines the process to rescrape and populate / update the data with new findings, inaccuracy fixes (with stored notes about previous inaccuracies and how to double / triple check the inferred data was inferred correctly). The rescrape instructions should including updating all existing ISP offerings in the db file, as well as recalculating the computed field values such as savings, approx 12 month cost etc.. etc.. And add instructions that a re-scan for new ISP's or any NBN plan offerings that weren't found last time should be checked for, old data should be backed up in a previous scrapes directory and completely fresh data should be pulled. And a comparison of the backup data and new data should be done to identify if something went majorly wrong in the scrape and to flag that in a "broken scrapes" folder and do an analysis with saved notes of what might have gone wrong and why.

The reason for this as I was alluding to at the start is that the leaptel offer is actually $115 per month for 12 months, then goes up to $125, which is a saving of $140, I think the previous analysis read the $115 per month with the $10 off line as equating to $105 per month when that's not actually the case unfortunately! So the savings got written down as $240 when they're actually only $120 🤣🤣
