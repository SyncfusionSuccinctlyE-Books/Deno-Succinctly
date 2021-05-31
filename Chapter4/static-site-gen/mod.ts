import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Marked } from "https://deno.land/x/markdown/mod.ts";
import { configure, renderFile } from "https://deno.land/x/eta/mod.ts";

const { BLOG, SUMMARY, COPYRIGHT, POSTS_DIR, PUBLISH_DIR } = config();

const viewPath = `${Deno.cwd()}/views/`;

// Configure ETA
configure({
  views: viewPath,
});

// Store the metadata for individual posts
type PostDetails = {
  title: string;
  description: string;
  date: Date;
  url: string;
};

// Detais of all posts
let posts: PostDetails[] = [];

async function generatePosts() {
  const decoder = new TextDecoder("utf-8");

  // Read in the files from the POSTS_DIR
  for await (const file of Deno.readDir(POSTS_DIR)) {
    const markdown = decoder.decode(await Deno.readFile(POSTS_DIR + file.name));
    const markup = Marked.parse(markdown);

    console.log(`Read ${POSTS_DIR}${file.name}`);

    // Determine the file name from the metadata
    const newPostFileName = markup.meta.title.toLowerCase().replace(/ /g, "-") +
      ".html";

    const post = {
      title: markup.meta.title,
      description: markup.meta.description,
      author: markup.meta.author,
      date: markup.meta.date,
      url: `./${newPostFileName}`,
    };

    let templateResult = await renderFile(
      "./post",
      {
        blog: BLOG,
        title: post.title,
        date: post.date,
        author: post.author,
        summary: SUMMARY,
        copyright: COPYRIGHT,
        content: markup.content,
      },
    );
    // Write the file to the PUBLISH_DIR
    await Deno.writeTextFile(
      PUBLISH_DIR + newPostFileName,
      templateResult,
    );

    console.log(`Wrote ${PUBLISH_DIR}${newPostFileName}`);

    posts.push(post);
  }

  console.log(posts);
}

async function generateHomepage() {
  // Sort posts by date: most recent posts first
  posts.sort((a, b) => {
    return (b.date.getTime() - a.date.getTime());
  });

  let templateResult = await renderFile(
    "./index",
    {
      blog: BLOG,
      summary: SUMMARY,
      copyright: COPYRIGHT,
      posts: posts,
    },
  );

  // Write the file to the PUBLISH_DIR
  await Deno.writeTextFile(
    PUBLISH_DIR + "index.html",
    templateResult,
  );
}

await generatePosts();
generateHomepage();
