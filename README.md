# Island Force Renewables (GitHub Pages)

This project is a fully static GitHub Pages build of the Island Force Renewables funnel. All media paths are wired through a single `ASSETS` object in `js/app.js`, so the site works on plain static hosting without environment variables.

## File Structure

```
/
  index.html
  /assets
    /img
      logo.png
      hero-poster.jpg
      financing.jpg
      why-go-solar.png
      solar-explainer-poster.jpg
      projects-strip-poster.jpg
      /projects
        project-01.jpg
        project-02.jpg
        project-03.jpg
        project-04.jpg
        project-05.jpg
        project-06.jpg
        project-07.jpg
        project-08.jpg
    /video
      hero.mp4
      projects.mp4
      solar-explainer.mp4
  /css
    styles.css
  /js
    app.js
  /data
    gallery.json
  README.md
```

## Deploy to GitHub Pages

1. Commit the project to a GitHub repository.
2. In GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select your default branch (usually `main`) and the `/root` folder.
5. Save. GitHub Pages will publish the site at `https://<username>.github.io/<repo>/`.

## Replace Media Assets

Update paths in the `ASSETS` object inside `js/app.js`:

```js
const ASSETS = {
  logo: "assets/img/logo.png",
  heroVideo: "assets/video/hero.mp4",
  heroPoster: "assets/img/hero-poster.jpg",
  financingImage: "assets/img/financing.jpg",
  whyGoSolar: "assets/img/why-go-solar.png",
  solarExplainerVideo: "assets/video/solar-explainer.mp4",
  solarExplainerPoster: "assets/img/solar-explainer-poster.jpg",
  projectsStripVideo: "assets/video/projects.mp4",
  projectsStripPoster: "assets/img/projects-strip-poster.jpg"
};
```

Place your replacement files in the same locations listed above so GitHub Pages works out of the box.

## Add More Gallery Items

Update `data/gallery.json` with additional entries. Each item should include:

```json
{
  "id": "project-09",
  "title": "Example Project",
  "location": "Parish, Jamaica",
  "image": "assets/img/projects/project-09.jpg",
  "alt": "Short accessible description"
}
```

The gallery automatically renders a featured item, a recent strip, and the full grid from this file.
