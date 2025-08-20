const otpStore = new Map(); // {telephone: {otp, expireAt}}

function setOTP(telephone, otp, ttl = 300000) { // 5 min
    otpStore.set(telephone, { otp, expireAt: Date.now() + ttl });
}

function verifyOTP(telephone, otp) {
    const record = otpStore.get(telephone);
    if (!record) return false;
    if (Date.now() > record.expireAt) {
        otpStore.delete(telephone);
        return false;
    }
    return record.otp === otp;
}

module.exports = { setOTP, verifyOTP };
