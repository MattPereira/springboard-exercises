const App = () => (
  <div>
    <Alert type="primary" message="I am a bootstrap alert made using react!" />
    <Alert type="warning" message="I am a bootstrap alert made using react!" />
    <Alert type="danger" message="I am a bootstrap alert made using react!" />

    <div className="row">
      <Person
        name="Bojack"
        age={33}
        hobbies={["drinking", "smoking", "swimming"]}
      />
      <Person
        name="Todd"
        age={17}
        hobbies={["eating", "sleeping", "contemplating"]}
      />
      <Person
        name="PeanutButter"
        age={27}
        hobbies={["walking", "barking", "chewing"]}
      />
    </div>

    <Button type="success" text="REACT BUTTON" />
    <Button type="warning" text="REACT BUTTON" />
    <Button type="danger" text="REACT BUTTON" />
  </div>
);
