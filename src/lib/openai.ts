import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function generateImagePrompt(name: string) {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a creative and helpful AI assistant capable of generating interesting thumbnail descriptions for my notes. Your output will be fed into the DALL·E API to generate a thumbnail. The description should be minimalistic and flat styled",
          },
          {
            role: "user",
            content: `Please generate a thumbnail description for my notebook titled ${name}`,
          },
        ],
      });
  
      if (response.status !== 200) {
        // Handle non-successful HTTP responses here
        console.error(`Error in generateImagePrompt: HTTP ${response.status}`);
        return null; // You can return null or handle it in a way that makes sense for your application
      }
  
      const data = await response.json();
  
      if (!data || !data.choices || data.choices.length === 0) {
        // Handle missing or empty choices array
        console.error(`Error in generateImagePrompt: Invalid data structure`);
        return null;
      }
  
      const image_description = data.choices[0].message.content;
      return image_description as string;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
export async function generateImage(image_description: string) {
  try {
    const response = await openai.createImage({
      prompt: image_description,
      n: 1,
      size: "256x256",
    });
    const data = await response.json();
    const image_url = data.data[0].url;
    return image_url as string;
  } catch (error) {
    console.error(error);
  }
}