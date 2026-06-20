export const formatPrice = (value: number): string => {
	// this is another way to format the price
	// if(value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
	// if(value >= 1000) return `${(value / 1000).toFixed(1)}K`;
	// return value.toString();

	if (value >= 1000000) {
		const cr = (value / 1000000).toFixed(1).replace(/\.0$/, "");
		return `₹${cr} Cr`;
	}
    if(value >= 10000) {
        const lakhs = (value / 10000).toFixed(1).replace(/\.0$/, "");
        return `₹${lakhs} Lakh`;
    }
    return `₹${value.toLocaleString()}`;
};
