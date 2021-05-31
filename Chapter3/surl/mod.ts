const { args: [url] } = Deno;

function isUrlValid(input: string) {
  const regex =
    "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
  var url = new RegExp(regex, "i");
  return url.test(input);
}

async function shorten(url: string): Promise<{ result_url: string }> {
  if (url === "" || url === undefined) {
    throw { error: "No URL provided" };
  }

  if (!isUrlValid(url)) {
    throw { error: "The URL provided is invalid" };
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  };
  const res = await fetch("https://cleanuri.com/api/v1/shorten", options);
  const data = await res.json();
  return data;
}

try {
  const { result_url } = await shorten(url);
  console.log(`SUCCESS: Your long URL: ${url}`);
  console.log(`... is now shorter: ${result_url} `);

  await Deno.writeTextFile(
    "urls.txt",
    `${url} -> ${result_url}\n`,
    { append: true },
  );
} catch (error) {
  console.log(`ERROR: ${error}`);
}