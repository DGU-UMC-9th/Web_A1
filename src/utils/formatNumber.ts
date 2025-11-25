export const formatNumber = (value: string | number) => {
    if (typeof value === 'number') {
        return new Intl.NumberFormat().format(value);
    }

    const match = value.match(/^([^0-9-]*)(-?[0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) {
        return value;
    }

    const [, prefix, numericPart, suffix] = match;
    const sanitized = Number(numericPart.replace(/,/g, ''));

    if (Number.isNaN(sanitized)) {
        return value;
    }

    return `${prefix}${new Intl.NumberFormat().format(sanitized)}${suffix}`;
};
