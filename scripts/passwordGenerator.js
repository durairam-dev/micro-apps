function clickGenerateButton() {
  const length = document.getElementById("passwordLength").value;
  const includeUppercase = document.getElementById("includeUppercase").checked;
  const includeNumbers = document.getElementById("includeNumbers").checked;
  const includeSymbols = document.getElementById("includeSymbols").checked;
  document.getElementById("generatedPassword").value = generatePassword(
    length,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );
}

function generatePassword(
  length,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  let characters = lowercase;
  const requiredCharacters = [];

  if (includeUppercase) {
    characters += uppercase;
    requiredCharacters.push(uppercase);
  }
  if (includeNumbers) {
    characters += numbers;
    requiredCharacters.push(numbers);
  }
  if (includeSymbols) {
    characters += symbols;
    requiredCharacters.push(symbols);
  }

  let password = "";

  // Ensure at least one character from each selected category
  requiredCharacters.forEach((charSet) => {
    password += charSet.charAt(Math.floor(Math.random() * charSet.length));
  });

  // Fill the remaining length with random characters from the combined set
  for (let i = password.length; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  // Convert the password to an array and shuffle it to maintain randomness
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
}
