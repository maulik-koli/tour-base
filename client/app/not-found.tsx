import Icon from '@/components/icons';
import { Button } from '@ui/button';
import { Typography } from '@/components/ui/typography';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center p-6 ">
                <Icon
                    name="SearchX"
                    className="mx-auto h-12 w-12 text-muted-foreground"
                />

                <Typography variant="lead" className="mt-4">
                    Page not found
                </Typography>

                <Typography className="mt-2 text-muted-foreground">
                    {`The page you're looking for doesn’t exist or has been moved.`}
                </Typography>

                <div className="mt-6 flex w-full items-center justify-center">

                    <Button variant="outline" asChild>
                        <a href="/">Go to Home</a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
