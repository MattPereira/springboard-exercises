"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showDeleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  //show empty or filled heart based on if user is logged in
  const showFilled = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
      ${showDeleteBtn ? getDeleteBtnHTML() : ""}
      ${showFilled ? getHeartHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

function getHeartHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const heartType = isFavorite ? "fas" : "far";
  return `
  <span class="heart">
    <i class="${heartType} fa-heart"></i>
  </span>`;
}

///// MAKE DELETE BUTTON HERE

function getDeleteBtnHTML(story, user) {
  return `
    <span class="deleteBtn">
      <i class="fas fa-trash-alt"></i>
    </span>
    `;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

//**Gets data from #submit-form, calls storyList.addStory method, puts new story on page */

async function submitNewStory(evt) {
  console.debug("submitNewStory");
  evt.preventDefault();

  const title = $("#new-title").val();
  const author = $("#new-author").val();
  const url = $("#new-url").val();
  const storyData = { title, url, author };

  console.log(storyData);

  const story = await storyList.addStory(currentUser, storyData);

  const $story = generateStoryMarkup(story, true);
  $allStoriesList.prepend($story);

  $submitForm.hide();
  $submitForm.trigger("reset");
}

$submitForm.on("submit", submitNewStory);

//fills in heart that was clicked and adds clicked story to currentUser favorites array
async function addFavoriteStory(evt) {
  console.debug("addFavoriteStory");

  const heart = evt.target.classList;

  heart.remove("far");
  heart.add("fas");

  const storyId = evt.target.parentElement.parentElement.id;

  const story = await storyList.getStoryById(storyId);

  await currentUser.addFavorite(story);
}

$allStoriesList.on("click", ".heart .far", addFavoriteStory);

//removes heart filling and removes clicked story from currentUser favorites array
async function removeFavoriteStory(evt) {
  console.debug("removeFavoriteStory");

  const heart = evt.target.classList;

  heart.remove("fas");
  heart.add("far");

  const storyId = evt.target.parentElement.parentElement.id;

  const story = await storyList.getStoryById(storyId);

  await currentUser.removeFavorite(story);
}

$allStoriesList.on("click", ".heart .fas", removeFavoriteStory);

//removes a story
async function removeOwnStory(evt) {
  console.debug("removeOwnStory");

  const storyId = evt.target.parentElement.parentElement.id;

  const story = await storyList.getStoryById(storyId);

  await storyList.removeStory(currentUser, storyId);

  putOwnStoriesOnPage();
}

$allStoriesList.on("click", ".deleteBtn .fas", removeOwnStory);

// Removes $allStoriesList and replaces with
function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");

  $allStoriesList.empty();

  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function putOwnStoriesOnPage() {
  console.debug("putOwnStoriesOnPage");

  $allStoriesList.empty();

  for (let story of currentUser.ownStories) {
    const $story = generateStoryMarkup(story, true);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}
