const App = () => (
  <div>
    <Tweet
      username="WhiskeyNeat"
      profilePic="https://www.puroshow.com/u/fotografias/m/2021/12/8/f1280x720-29018_160693_5050.jpg"
      name="Bojack Horseman"
      date={new Date().toDateString()}
      message="I feel like my life is just a series of unrelated wacky adventures"
    />
    <Tweet
      username="PokeyMan"
      profilePic="https://filmdaily.co/wp-content/uploads/2021/04/todd-lede.jpg"
      name="Todd Chavez"
      date={new Date().toDateString()}
      message="You turn yourself around. That's what it's all about."
    />
    <Tweet
      username="DoggyDoggyWhatNow"
      profilePic="https://cdn.costumewall.com/wp-content/uploads/2018/09/mr-peanutbutter.jpg"
      name="Mr. Peanutbutter"
      date={new Date().toDateString()}
      message="The universe is a cruel, uncaring void. The key to being happpy isn't to search for meaning. It's just to keep yourself busy with unimportant nonsense, and eventually, you'll be dead."
    />
  </div>
);
