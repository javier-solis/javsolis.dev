use std::fs;
use std::path::Path;
use handlebars::Handlebars;
use serde::Serialize;
use std::error::Error;

#[derive(Serialize)]
struct Context {
title: String,
}

fn main() -> Result<(), Box<dyn Error>> {
  let mut handlebars = Handlebars::new();

  handlebars.register_template_file("index", "templates/index.hbs")?;

  let context = Context {
    title: "test".to_string(),
  };

  let rendered = handlebars.render("index", &context)?;

  let docs_dir = "../docs";

  // Remove the ../docs directory if it exists and recreate it
  if Path::new(docs_dir).exists() {
    fs::remove_dir_all(docs_dir)?;
  }
  fs::create_dir_all(docs_dir)?;

  fs::write(Path::new(&format!("{}/index.html", docs_dir)), rendered)?;

  // Copy static files from parent directory to ../docs
  for file in ["main.css", "main.js"] {
    fs::copy(format!("{}/{}", docs_dir, file), format!("../{}", file))?;
  }

  Ok(())
}
