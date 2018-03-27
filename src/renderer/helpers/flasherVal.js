module.exports = function (percentage) {
    let _onTime, _offTime
    if (percentage < 49) {
        _onTime = percentage * 100
        _offTime = 5000
    } else if (percentage === 50) {
        _onTime = 5000
        _offTime = 5000
    } else if (percentage > 50) {
        _onTime = 5000
        _offTime = (100 - percentage) * 100
    } else {
        console.log("something is wrong with your convertToFlasher Module, Dylan");
    }

    return {
        onTime: _onTime,
        offTime: _offTime
    }
    // console.log("_onTime is ", _onTime)
    // console.log("_offTime is", _offTime);
}