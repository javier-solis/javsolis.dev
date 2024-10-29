use std::fs;
use std::path::Path;
use handlebars::{DirectorySourceOptions, Handlebars};
use serde::Serialize;
use anyhow::{Result, Context};

#[derive(Serialize)]
struct ContextStruct {
  title: String,
}

fn main() -> Result<()> {
  let mut handlebars = Handlebars::new();

  handlebars.register_template_file("index", "templates/index.hbs")
    .context("Failed to register index template")?;

  // Register all partials in the 'partials' directory
  let partials_path = Path::new("templates/partials");
  let partials_config = DirectorySourceOptions::default();
  handlebars.register_templates_directory(partials_path, partials_config)
    .context("Failed to register partials from directory")?;

  let context = ContextStruct {
    title: "test".to_string(),
  };

  let rendered = handlebars.render("index", &context)
    .context("Failed to render index template")?;

  let docs_dir = "../docs";

  // Remove the ../docs directory if it exists and recreate it
  if Path::new(docs_dir).exists() {
    fs::remove_dir_all(docs_dir)
      .context("Failed to remove existing docs directory")?;
  }
  fs::create_dir_all(docs_dir)
    .context("Failed to create docs directory")?;

  fs::write(Path::new(&format!("{}/index.html", docs_dir)), rendered)
    .context("Failed to write index.html")?;

  // Copy static files from parent directory to ../docs
  for file in ["main.css", "main.js"] {
    let from = format!("../{}", file);
    let to = format!("{}/{}", docs_dir, file);
    fs::copy(&from, &to)
      .with_context(|| format!("Failed to copy static file: {}", file))?;
  }

  Ok(())
}