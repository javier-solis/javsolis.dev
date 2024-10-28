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

  fs::create_dir_all("docs")?;  // ensures the /docs directory exists

  fs::write(Path::new("docs/index.html"), rendered)?;

  Ok(())
}
