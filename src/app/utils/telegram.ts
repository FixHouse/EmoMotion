const TELEGRAM_BOT_TOKEN = '8223561803:AAGCdXoLIRt-c_ieJntE6oeXuA8eVnfw20Q';
const TELEGRAM_CHAT_ID = '-1003879547055';

interface BookingData {
  childName: string;
  age: string;
  phone: string;
  group: string;
  trialDate: string;
}

export async function sendToTelegram(message: string): Promise<boolean>;
export async function sendToTelegram(data: BookingData, language: string): Promise<boolean>;
export async function sendToTelegram(dataOrMessage: BookingData | string, language: string = 'uk'): Promise<boolean> {
  // If it's a string, just send it directly
  if (typeof dataOrMessage === 'string') {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: dataOrMessage,
            parse_mode: 'HTML',
          }),
        }
      );

      if (!response.ok) {
        console.error('Telegram API error:', await response.text());
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error sending to Telegram:', error);
      return false;
    }
  }

  // Otherwise, it's BookingData object
  const data = dataOrMessage;
  const groupTimes: { [key: string]: string } = {
    '3-5': '16:00-16:40',
    '6-8': '17:00-17:50'
  };

  const languageEmojis: { [key: string]: string } = {
    'uk': '🇺🇦',
    'cs': '🇨🇿',
    'en': '🇬🇧'
  };

  const languageLabels: { [key: string]: { [key: string]: string } } = {
    'uk': {
      title: 'НОВА ЗАЯВКА!',
      childName: 'Ім\'я дитини',
      age: 'Вік',
      phone: 'Телефон',
      group: 'Група',
      trialDate: 'Дата заняття',
      schedule: 'Розклад',
      location: 'Локація',
      years: 'років'
    },
    'cs': {
      title: 'NOVÁ PŘIHLÁŠKA!',
      childName: 'Jméno dítěte',
      age: 'Věk',
      phone: 'Telefon',
      group: 'Skupina',
      trialDate: 'Datum lekce',
      schedule: 'Rozvrh',
      location: 'Umístění',
      years: 'let'
    },
    'en': {
      title: 'NEW APPLICATION!',
      childName: 'Child\'s name',
      age: 'Age',
      phone: 'Phone',
      group: 'Group',
      trialDate: 'Class date',
      schedule: 'Schedule',
      location: 'Location',
      years: 'years'
    }
  };

  const labels = languageLabels[language] || languageLabels['uk'];

  const message = `
🎉 <b>${labels.title}</b> ${languageEmojis[language] || ''}

━━━━━━━━━━━━━━━━━━━━
👶 <b>${labels.childName}:</b> ${data.childName}
🎂 <b>${labels.age}:</b> ${data.age} ${labels.years}
📱 <b>${labels.phone}:</b> ${data.phone}
👥 <b>${labels.group}:</b> ${data.group} ${labels.years} (${groupTimes[data.group] || ''})
📅 <b>${labels.trialDate}:</b> ${data.trialDate}.2026
━━━━━━━━━━━━━━━━━━━━

⏰ <b>${labels.schedule}:</b> Понеділок та Середа / Pondělí a Středa / Monday & Wednesday
📍 <b>${labels.location}:</b> EmoMotion Studio, Praha
  `.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!response.ok) {
      console.error('Telegram API error:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return false;
  }
}