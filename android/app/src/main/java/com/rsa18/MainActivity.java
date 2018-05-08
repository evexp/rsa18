package com.rsa18;

import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import org.devio.rn.splashscreen.SplashScreen;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState, persistentState);
        setContentView(R.layout.activity_splash);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "rsa18";
    }
}
