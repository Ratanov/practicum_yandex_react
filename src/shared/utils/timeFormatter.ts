export const timeFormatter = {
  /**
   * Преобразование даты в читаемый формат
   * @param isoString Дата в ISO формате
   * @returns {string} дата в формате `date, time GMT+3`
   */
  formatToRussian: (isoString?: string): string => {
    if (!isoString) {
      return '';
    }

    const dayInMs = 1000 * 60 * 60 * 24;

    const formatConfig: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZone: 'Europe/Moscow',
      timeZoneName: 'short',
    };

    const targetDate = new Date(isoString);
    const formattedParts = targetDate
      .toLocaleString('ru-RU', formatConfig)
      .split(',');
    const datePart = formattedParts[0].trim();
    const timePart = formattedParts[1].trim();

    const now = new Date();

    const timeDiff = Math.abs(now.getTime() - targetDate.getTime());
    const daysDiff = Math.ceil(timeDiff / dayInMs);

    if (targetDate.toDateString() === now.toDateString()) {
      return 'Сегодня, ' + timePart;
    } else if (daysDiff === 1) {
      return 'Вчера, ' + timePart;
    } else if (daysDiff >= 2 && daysDiff <= 4) {
      return `${daysDiff} дня назад, ${timePart}`;
    }

    return `${datePart}, ${timePart}`;
  },

  isWithinLastDay(isoString: string): boolean {
    const current = new Date();
    const deltaMs = current.getTime() - new Date(isoString).getTime();
    const msInDay = 24 * 60 * 60 * 1000;
    return deltaMs <= msInDay && deltaMs >= 0;
  },
};
