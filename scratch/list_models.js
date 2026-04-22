const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyCK9rPEoWURoedvIetVGYXgjPp4woGo250");

async function listModels() {
  try {
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyCK9rPEoWURoedvIetVGYXgjPp4woGo250");
    const data = await res.json();
    console.log(JSON.stringify(data.models.map(m => m.name), null, 2));
  } catch (e) {
    console.error(e);
  }
}

listModels();
